terraform {

  required_version = ">= 0.13"

  required_providers {
    aws = {
      source = "hashicorp/aws",
      version = "4.37.0"
    }

    template = {
      source = "hashicorp/template"
      version = "2.1.2"
    }

    null = {
      source = "hashicorp/null"
      version = "2.1.2"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

provider "template" { }
provider "null" { }
