variable "region" { default = "us-east-1" }
variable "vpc_cidr" { default = "10.0.0.0/16" }
variable "azs" { default = ["us-east-1a", "us-east-1b"] }
variable "key_name" { type = string }
variable "db_name" { default = "mediplan" }
variable "db_username" { default = "admin" }
variable "db_password" { type = string }
variable "bucket_name" { type = string }
