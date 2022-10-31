#cf. https://www.terraform.io/docs/providers/aws/r/s3_bucket.html
resource "aws_s3_bucket" "assets" {
  bucket = var.assets_bucket_name

  tags = {
    Created_By = "Terraform - do not modify in AWS Management Console"
  }
}

resource "aws_s3_bucket_cors_configuration" "asset_bucket_cors_rule" {
  bucket = aws_s3_bucket.assets.id

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

data "aws_iam_policy_document" "allow_public_GET" {
  statement {

    sid = "PublicReadGetObject"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "arn:aws:s3:::${var.assets_bucket_name}/*"
    ]
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = aws_s3_bucket.assets.id
  policy = data.aws_iam_policy_document.allow_public_GET.json
}