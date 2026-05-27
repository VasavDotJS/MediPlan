import { Router, Response } from "express";
import { AppDataSource } from "../data-source";
import { Appointment, AppointmentStatus } from "../models/Appointment";
import { authenticateJWT, AuthRequest, authorizeRoles } from "../middleware/auth";
import { User, UserRole } from "../models/User";

const router = Router();
const appointmentRepository = AppDataSource.getRepository(Appointment);
const userRepository = AppDataSource.getRepository(User);

// Book an appointment (Patient only)
router.post("/", authenticateJWT, authorizeRoles(UserRole.PATIENT), async (req: AuthRequest, res: Response) => {
  const { doctorId, appointmentDate, reason } = req.body;
  const patientId = req.user?.id;

  try {
    const patient = await userRepository.findOneBy({ id: patientId });
    const doctor = await userRepository.findOneBy({ id: doctorId, role: UserRole.DOCTOR });

    if (!patient || !doctor) {
      return res.status(404).json({ message: "Patient or Doctor not found" });
    }

    const appointment = appointmentRepository.create({
      patient,
      doctor,
      appointmentDate: new Date(appointmentDate),
      reason,
      status: AppointmentStatus.PENDING,
    });

    await appointmentRepository.save(appointment);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
});

// Get appointments for the logged-in user
router.get("/my-appointments", authenticateJWT, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  try {
    let appointments;
    if (role === UserRole.PATIENT) {
      appointments = await appointmentRepository.find({
        where: { patient: { id: userId } },
        relations: ["doctor"],
      });
    } else if (role === UserRole.DOCTOR) {
      appointments = await appointmentRepository.find({
        where: { doctor: { id: userId } },
        relations: ["patient"],
      });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

// Update appointment status (Doctor or Admin)
router.patch("/:id/status", authenticateJWT, authorizeRoles(UserRole.DOCTOR, UserRole.ADMIN), async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    const appointment = await appointmentRepository.findOneBy({ id: parseInt(id) });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    if (notes) appointment.notes = notes;

    await appointmentRepository.save(appointment);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
});

export default router;
