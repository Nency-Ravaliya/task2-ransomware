# Docker Hub Deployment for Ransomware Dashboard

## Step 1: Log in to Docker Hub
Open your terminal and log in to your Docker Hub account:

```bash
docker login
```
You will be prompted to enter your Docker Hub username and password.

## Step 2: Build Docker Images

### 2.1 Build the Flask API Image
Navigate to the root of your project (where your Dockerfile for the Flask API is located) and run the following command:

```bash
docker build -t yourusername/ransomware-dashboard-api -f Dockerfile .
```
Replace `yourusername` with your actual Docker Hub username.

### 2.2 Build the React Frontend Image
Next, navigate to the frontend directory:

```bash
cd frontend
```
Then build the Docker image for the React frontend:

```bash
docker build -t yourusername/ransomware-dashboard-frontend -f Dockerfile .
```

## Step 3: Push Docker Images to Docker Hub

### 3.1 Push the Flask API Image
Go back to the root directory (if you are not there):

```bash
cd ..
```
Now, push the Flask API image to Docker Hub:

```bash
docker push yourusername/ransomware-dashboard-api
```

### 3.2 Push the React Frontend Image
Navigate back to the frontend directory (if you're not there):

```bash
cd frontend
```
Now, push the React frontend image to Docker Hub:

```bash
docker push yourusername/ransomware-dashboard-frontend
```

## Step 4: Verify the Images on Docker Hub
1. Go to Docker Hub.
2. Log in to your account.
3. Navigate to your repositories to confirm that both images (`ransomware-dashboard-api` and `ransomware-dashboard-frontend`) are listed.

## Summary
By following these steps, you should have successfully built your Docker images for both the Flask API and React frontend, and pushed them to Docker Hub. You can now use these images to deploy your application on platforms like Azure, AWS, or any other cloud service that supports Docker. If you have any questions or run into issues, feel free to ask!
```
