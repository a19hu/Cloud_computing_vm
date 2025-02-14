# VirtualBox Setup: Running Frontend (Vite) and Backend (Django)

This guide outlines the steps to set up and run a frontend (Vite) on an Ubuntu Virtual Machine (VM1) and a backend (Django) on a Kali Linux Virtual Machine (VM2) using VirtualBox.

## Step 1: Find IP Addresses of Both VMs

To determine the IP addresses of both virtual machines, run the following command inside each VM:

```bash
ifconfig
```

### Example IP Addresses:
- **VM1 (Frontend - Ubuntu):** `198.68.100.5`
- **VM2 (Backend - Kali Linux):** `198.68.100.4`

## Step 2: Set Up and Run Frontend on Ubuntu (VM1)

### 2.1 Clone the Codebase
```bash
git clone https://github.com/a19hu/Cloud_computing_vm.git
cd Cloud_computing_vm/project/
```

### 2.2 Configure IP Address
Update the <a href="https://github.com/a19hu/Cloud_computing_vm/blob/master/project/src/config.tsx">config.tsx</a> file to replace the backend IP address with `198.68.100.4` (VM2's IP address).



### 2.3 Install Dependencies and Run Frontend
```bash
npm install
npm run dev
```

### 2.4 Access the Frontend
Open your browser and go to:
[http://198.68.100.5:5173](http://198.68.100.5:5173)

---

## Step 3: Set Up and Run Backend on Kali Linux (VM2)

### 3.1 Clone the Codebase
```bash
git clone https://github.com/a19hu/Cloud_computing_vm.git
cd Cloud_computing_vm/myproject/
```

### 3.2 Set Up Virtual Environment and Install Dependencies
```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### 3.3 Configure IP Address
Update the <a href="https://github.com/a19hu/Cloud_computing_vm/blob/master/myproject/myproject/settings.py">setting.py</a> file to replace the frontend IP address with `198.68.100.5` (VM1's IP address).
<img src="image.png"></img>

### 3.4 Run the Django Backend
```bash
python3 manage.py runserver 0.0.0.0:8080
```

### 3.5 Access the Backend
Visit:
[http://198.68.100.4:8080](http://198.68.100.4:8080)

---

## Additional Notes
- Ensure both VMs are on the same network for communication.
- Use `sudo ufw allow 8080` to open the necessary ports if required.
- If you face any issues, check firewall settings and network configurations.

This setup ensures a smooth connection between the frontend and backend running on separate VirtualBox VMs.
