provider "aws" {
  region = var.region
}

module "vpc" {
  source   = "./modules/vpc"
  vpc_cidr = var.vpc_cidr
  azs      = var.azs
}

module "ec2" {
  source           = "./modules/ec2"
  vpc_id           = module.vpc.vpc_id
  public_subnet_id = module.vpc.public_subnets[0]
  key_name         = var.key_name
}

module "rds" {
  source          = "./modules/rds"
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  app_sg_id       = module.ec2.app_sg_id
  db_name         = var.db_name
  db_username     = var.db_username
  db_password     = var.db_password
}

module "s3" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
}
