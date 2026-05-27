variable "vpc_id" {}
variable "public_subnet_id" {}
variable "ami_id" {
  default = "ami-053b0d53c279acc90" # Ubuntu 22.04 LTS in us-east-1
}
variable "key_name" {}
