import subprocess

def setup():
    # Install requirements
    subprocess.run(["pip3", "install", "-r", "requirements.txt"])

if __name__ == "__main__":
    setup()