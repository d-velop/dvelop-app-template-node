terraform {

  required_version = ">= 0.13"

  required_providers {
    aws = {
      source = "hashicorp/aws",
      version = "4.37.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}
