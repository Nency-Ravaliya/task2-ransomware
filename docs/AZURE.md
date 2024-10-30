# Deploying Flask API and React Frontend to Azure using Docker

## Step 1: Set Up Azure App Services

1. **Create an Azure App Service**:
   - Go to the Azure Portal.
   - Click on "Create a resource" and select "Web App".
   - Choose a subscription, resource group, and give your app a name.
   - Select the runtime stack as "Docker".
   - Choose the region and click "Review + create".

2. **Configure Docker Settings**:
   - In your Azure App Service, go to the "Container settings" section.
   - Set the "Image Source" to "Docker Hub".
   - For the **Flask API**:
     - Enter `yourusername/ransomware-dashboard-api` as the image name.
   - For the **React Frontend**:
     - Create another Azure App Service and enter `yourusername/ransomware-dashboard-frontend` as the image name.

## Step 2: Configure Environment Variables

1. **Set Environment Variables**:
   - In the Azure App Service for your Flask API, go to "Configuration" and add the following environment variable:
     - `MONGO_URI` with the value of your MongoDB Atlas connection string:

       ```plaintext
       mongodb+srv://username:<password>@cluster0.mongodb.net/ransomware_db?retryWrites=true&w=majority
       ```

   - Make sure to replace `<password>` with your actual password.

## Step 6: Restart Your Azure App Services

After configuring everything, restart both Azure App Services to ensure they are using the latest configurations.

## Step 7: Access Your Application

- Access the Flask API at `http://<your-flask-app-name>.azurewebsites.net/ransomware`.
- Access the React frontend at `http://<your-frontend-app-name>.azurewebsites.net`.

=
