ALL COMMANDS USED FROM SETUP INFRA AND HELM CHARTS
#create helm chart
helm create [name]

# for terraform linting open vscode press ctrl+p and paste the following command
ext install HashiCorp.terraform 

#tflint
https://github.com/terraform-linters/tflint
Bash script (Linux):
$ curl https://raw.githubusercontent.com/terraform-linters/tflint/master/install_linux.sh | bash

#to install adminer run following command
kubectl create namespace adminer
helm upgrade --install acdb-adminer . --namespace adminer --set namespace="adminer"  
#but we are going to install adminer chart through terraform

#
- name: test-web
  image: gcr.io/project-id/image-name:${DRONE_COMMIT:0:7}
  commands:
    - sleep 10
    - cd /
    - ls
    - cd /usr/share/nginx/html/static/js | cd /usr/app/
    - ls

#
# terraform
snap install --candidate terraform
terraform init
#create .tf file and add resources and provider in it
terraform apply
#to destroy terraform cluster and infrastructure 
terraform destroy
terraform init -upgrade
#version control system
terraform init -reconfigure
terraform destroy -target=resource_type.resource_name
terraform apply -var-file="secret.tfvars"

# bucket name convention
projects/_/buckets/name

# newman postman
npm install -g newman

# helm drone

helm upgrade --install "pr${DRONE_PULL_REQUEST}" . --namespace "pr${DRONE_PULL_REQUEST}" 
--set namespace="pr${DRONE_PULL_REQUEST}" 
--set hostnames.web="pr${DRONE_PULL_REQUEST}.altrunic.org" 
--set hostnames.ambassador="pr${DRONE_PULL_REQUEST}-api.altrunic.org" 
--set hostnames.admin="pr${DRONE_PULL_REQUEST}-admin.altrunic.org" 
--set tag="${DRONE_COMMIT:0:7}" 
--set postgresql.postgresqlPassword="$POSTGRES_PASSWORD" 
--set google.sa_key="$GOOGLE_APP_SA"  
--set databases.sternguard="pr${DRONE_PULL_REQUEST}-sternguard" 
--set databases.social="pr${DRONE_PULL_REQUEST}-social" 
--set databases.content="pr${DRONE_PULL_REQUEST}-content" 
--set databases.notification="pr${DRONE_PULL_REQUEST}-notification" 
--set rudderstack.key="$RUDDERSTACK_WRITE_KEY" 
--set rudderstack.webWriteKey="$RUDDERSTACK_WEB_WRITE_KEY" 
--set intercom.key="$INTERCOM_KEY" 
--set intercom.appID="$INTERCOM_APP_ID" 
--set secrets.accessTokenKey="$ACCESS_TOKEN_SECRET_KEY" 
--set secrets.refreshTokenKey="$REFRESH_TOKEN_SECRET_KEY" 
--set secrets.resetPasswordKey="$RESET_PASSWORD_TOKEN_SECRET_KEY" 
--set secrets.cookieKey="$COOKIE_SECRETE_KEY" 
--set google.oauthClientID="$GOOGLE_OAUTH_CLIENT_ID" 
--set google.oauthClientSecret="$GOOGLE_OAUTH_CLIENT_SECRET" 
--set azure.oauthClientID="$AZURE_OAUTH_CLIENT_ID" 
--set azure.oauthClientSecret="$AZURE_OAUTH_CLIENT_SECRET" 
--set azure.oauthTenantID="$AZURE_OAUTH_TENANT_ID" 
--set kafka.userName="$KAFKA_USERNAME" 
--set kafka.password="$KAFKA_PASSWORD" 
--set kafka.eventTopic="$KAFKA_TOPIC" 
--set kafka.sensitiveTopic="$KAFKA_SENSITIVE_TOPIC" 
--set kafka.sitePublish="$KAFKA_SITE_TOPIC" 
--set kafka.notificationSensitiveClient="pr${DRONE_PULL_REQUEST}_${KAFKA_NOTIFICATION_SENSITIVE_CLIENT}" 
--set kafka.notificationEventClient="pr${DRONE_PULL_REQUEST}_${KAFKA_NOTIFICATION_EVENT_CLIENT}" 
--set kafka.socialSensitiveClient="pr${DRONE_PULL_REQUEST}_${KAFKA_SOCIAL_SENSITIVE_CLIEN}" 
--set kafka.socialEventClient="pr${DRONE_PULL_REQUEST}_${KAFKA_SOCIAL_EVENT_CLIENT}" 
--set kafka.addCampaignClient="pr${DRONE_PULL_REQUEST}_${KAFKA_VB_CAMPAIGN_CLIENT}" 
--set kafka.sternguardEventClient="pr${DRONE_PULL_REQUEST}_${KAFKA_STERNGUARD_EVENT_CLIENT}" 
--set kafka.parserSitePublishClient="pr${DRONE_PULL_REQUEST}_${KAFKA_PARSER_SITEPUBLISH_CLIENT}" 
--set mailgun.apiKey="$MG_API_KEY" 
--set mongo.password="$MONGO_PASSWORD" 
--set mongo.host="$MONGO_HOST" 
--set stripe.secretKey="$STRIPE_SECRET_KEY" 
--set stripe.webhookSecret="$STRIPE_WEBHOOK_SECRET" 
--set stripe.destinationAccount="$STRIPE_DESTINATION_ACCOUNT"
--set aws.accessKeyID="$AWS_ACCESS_KEY" 
--set aws.secretKeyID="$AWS_SECRET_KEY" 
--set secrets.userActivationTokenKey="$USER_ACTIVATION_TOKEN_SECRET_KEY" 
--set cloudflare.configEmail="$CLOUDFLARE_EMAIL" 
--set cloudflare.apiKey="$CLOUDFLARE_API_KEY" 
--set cloudflare.apiToken="$CLOUDFLARE_API_TOKEN" 
--set cloudflare.zoneId="$CLOUDFLARE_ZOND_ID" 
-->



<!--
 - name: clean-testing-data
  image: imroz/postgres-auth:latest
  environment:
    POSTGRES_PASSWORD:
      from_secret: st-postgresql-password
    INSTANCE_IP:
      from_secret: st-psql-public-ip
  depends_on: [ cypress-testing ]
  commands:
  - cd backend/postgres-dev/
  - PGPASSWORD=$POSTGRES_PASSWORD psql -U postgres -h $INSTANCE_IP -d 'pr${DRONE_PULL_REQUEST}-sternguard' -a -f cleanSternCD.sql
  - PGPASSWORD=$POSTGRES_PASSWORD psql -U postgres -h $INSTANCE_IP -d 'pr${DRONE_PULL_REQUEST}-social' -a -f cleanSocialCD.sql 
  
  -->
