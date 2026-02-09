import { AWS_CNR, AZURE_CNR, GCP_CNR } from "utils/constants";

export const ALL_SERVICES = "all";

export const ALIBABA_ECS = "alibabaEcs";

export const AWS_IAM = "awsIam";
export const AWS_EC2 = "awsEc2";
export const AWS_EC2_EBS = "awsEc2Ebs";
export const AWS_EC2_VPC = "awsEc2Vpc";
export const AWS_RDS = "awsRds";
export const AWS_KINESIS = "awsKinesis";
export const AWS_S3 = "awsS3";

export const AZURE_COMPUTE = "azureCompute";
export const AZURE_NETWORK = "azureNetwork";

export const GCP_COMPUTE_ENGINE = "gcpComputeEngine";
export const GCP_IAM = "gcpAim";
export const GCP_CLOUD_STORAGE = "gcpCloudStorage";

export const NEBIUS_SERVICE = "nebius";

const AWS_SERVICES = Object.freeze({
  [AWS_IAM]: {
    type: AWS_CNR,
    name: "services.iam"
  },
  [AWS_EC2]: {
    type: AWS_CNR,
    name: "services.ec2"
  },
  [AWS_EC2_EBS]: {
    type: AWS_CNR,
    name: "services.ec2::ebs"
  },
  [AWS_EC2_VPC]: {
    type: AWS_CNR,
    name: "services.ec2::vpc"
  },
  [AWS_RDS]: {
    type: AWS_CNR,
    name: "services.rds"
  },
  [AWS_KINESIS]: {
    type: AWS_CNR,
    name: "services.kinesis"
  },
  [AWS_S3]: {
    type: AWS_CNR,
    name: "services.s3"
  }
});

const AZURE_SERVICES = Object.freeze({
  [AZURE_COMPUTE]: {
    type: AZURE_CNR,
    name: "services.compute"
  },
  [AZURE_NETWORK]: {
    type: AZURE_CNR,
    name: "services.network"
  }
});

const GCP_SERVICES = Object.freeze({
  [GCP_COMPUTE_ENGINE]: {
    type: GCP_CNR,
    name: "services.computeEngine"
  },
  [GCP_IAM]: {
    type: GCP_CNR,
    name: "services.iam"
  },
  [GCP_CLOUD_STORAGE]: {
    type: GCP_CNR,
    name: "services.cloudStorage"
  }
});

export const useRecommendationServices = () => ({
  [ALL_SERVICES]: {
    name: ALL_SERVICES
  },
  ...AZURE_SERVICES,
  ...AWS_SERVICES,
  ...GCP_SERVICES
});
