# Docker + PostgreSQL Setup Guide for Beginners

## 🎯 What We're Building
A PostgreSQL database running inside Docker that your Node.js app can connect to.

---

## 📚 Key Concepts (The Gist)

### What is Docker?
Think of Docker as a **virtual container** that runs software in isolation. Like a lunchbox that keeps your food separate from everything else.

**Why use it?**
- No messy installations on your computer
- Easy to start/stop/delete
- Same setup works on any computer

### What is PostgreSQL?
A **database** - a place to store your app's data (users, orders, products).

**Think of it like:**
- Database = Filing cabinet
- Tables = Drawers (users drawer, orders drawer)
- Rows = Individual files in each drawer

### Docker Terms Explained

| Term | Simple Explanation | Real-World Analogy |
|------|-------------------|-------------------|
| **Image** | Blueprint/recipe for software | Recipe for a cake |
| **Container** | Running instance of an image | The actual baked cake |
| **Port** | Door for communication | House address number |
| **Volume** | Permanent storage | External hard drive |

---

## 🚀 Step-by-Step Setup

### Step 1: Check Docker Installation

```bash
docker --version
```

**What it does:** Checks if Docker is installed  
**Expected output:** `Docker version 27.5.1` (or similar)

---

### Step 2: Download PostgreSQL Image

```bash
docker pull postgres
```

**What it does:** Downloads the PostgreSQL blueprint from Docker Hub  
**Think of it as:** Downloading an app from an app store  
**Time:** Takes 1-2 minutes depending on internet speed

**Common mistake:** Typing `postgress` (double 's') - it's `postgres` (single 's')!

---

### Step 3: Check Downloaded Images

```bash
docker images
```

**What it does:** Shows all downloaded blueprints  
**You should see:** `postgres` in the list

---

### Step 4: Start PostgreSQL Container

```bash
docker run --name kahadb -e POSTGRES_PASSWORD=kali -p 5432:5432 -d postgres
```

**Breaking it down:**

| Part | What It Means |
|------|---------------|
| `docker run` | Start a new container |
| `--name kahadb` | Give it a name (you choose this) |
| `-e POSTGRES_PASSWORD=kali` | Set password to "kali" (required!) |
| `-p 5432:5432` | Open port 5432 for connections |
| `-d` | Run in background (detached) |
| `postgres` | Use the postgres image |

**Important:** The password is REQUIRED. PostgreSQL won't start without it.

---

### Step 5: Verify Container is Running

```bash
docker ps
```

**What it does:** Shows all running containers  
**You should see:** Your container with name `kahadb` and status `Up`

---

### Step 6: Enter the Container

```bash
docker exec -it kahadb psql -U postgres
```

**Breaking it down:**

| Part | What It Means |
|------|---------------|
| `docker exec` | Run a command inside a container |
| `-it` | Interactive mode (you can type) |
| `kahadb` | Your container name |
| `psql` | PostgreSQL command-line tool |
| `-U postgres` | Login as user "postgres" (default admin) |

**You'll see:** `postgres=#` prompt (you're inside!)

---

### Step 7: Create Your Database

```sql
CREATE DATABASE ordermgmt;
```

**What it does:** Creates an empty database called `ordermgmt`  
**Think of it as:** Creating a new filing cabinet  
**Expected output:** `CREATE DATABASE`

---

### Step 8: Verify Database Was Created

```sql
\l
```

**What it does:** Lists all databases  
**You should see:** `ordermgmt` in the list

---

### Step 9: Exit PostgreSQL

```sql
\q
```

**What it does:** Quit and return to normal terminal

---

## 🎓 Your Database Credentials

Save these - you'll need them in your Node.js app:

```
Host: localhost
Port: 5432
Database: ordermgmt
Username: postgres
Password: kali
```

---

## 🔧 Useful Docker Commands

### Check Running Containers
```bash
docker ps
```

### Check All Containers (including stopped)
```bash
docker ps -a
```

### Stop Container
```bash
docker stop kahadb
```

### Start Container Again
```bash
docker start kahadb
```

### Remove Container (must stop first)
```bash
docker stop kahadb
docker rm kahadb
```

### View Container Logs
```bash
docker logs kahadb
```

### Rename Container
```bash
docker rename old-name new-name
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Port already in use"
**Error:** `bind: address already in use`

**Cause:** Something else is using port 5432

**Solution:**
```bash
# Check what's using the port
sudo lsof -i :5432

# Stop existing PostgreSQL
sudo systemctl stop postgresql

# Or use a different port
docker run --name kahadb -e POSTGRES_PASSWORD=kali -p 5433:5432 -d postgres
```

### Issue 2: "Repository does not exist"
**Error:** `pull access denied for postgress`

**Cause:** Typo - you typed `postgress` instead of `postgres`

**Solution:** Use correct spelling: `postgres` (single 's')

### Issue 3: Container exists but won't start
**Solution:**
```bash
# Remove the broken container
docker rm kahadb

# Create it again
docker run --name kahadb -e POSTGRES_PASSWORD=kali -p 5432:5432 -d postgres
```

---

## 🎯 What's Next?

Now that your database is ready:

1. ✅ Docker is running
2. ✅ PostgreSQL container is running
3. ✅ Database `ordermgmt` is created
4. ⏭️ **Next:** Connect your Node.js app to it

**Important:** You DON'T need to create tables manually!  
When you use `synchronize: true` in your Node.js app, it will automatically:
- Create tables (users, orders, products)
- Set up relationships
- Handle everything for you

---

## 💡 Quick Reference

### The Flow
```
1. Pull Image (download blueprint)
   ↓
2. Run Container (start the database)
   ↓
3. Create Database (make storage space)
   ↓
4. Connect App (use it in your code)
```

### Remember
- **Image** = Blueprint (download once)
- **Container** = Running database (start/stop anytime)
- **Database** = Storage inside container (create once)
- **Tables** = Your app creates these automatically

---

## 📝 Notes

- Container name: `kahadb` (you can change this)
- Database name: `ordermgmt` (you can change this)
- Password: `kali` (you can change this)
- Port: `5432` (standard PostgreSQL port)

**Pro tip:** Keep this file handy - you'll reference it often when learning!
