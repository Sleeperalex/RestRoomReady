import subprocess
import os
from selenium import webdriver
import multiprocessing
import time



def start_server():

    app_directory = os.path.dirname(os.path.abspath(__file__))
    os.chdir(app_directory)

    try:

        server_process = subprocess.Popen(["python", "-m", "http.server"])
        server_process.wait()

    except KeyboardInterrupt:
        pass

    except Exception:
        pass



def open_page():

    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-automation", "enable-logging"])
    driver = webdriver.Chrome(options=options)
    driver.get("http://localhost:8000")

    return driver



def main():

    try :
        print("Server started...")
        b=True
        server_process = multiprocessing.Process(target=start_server)
        server_process.start()
        d = open_page()
        while b==True:
            if d.current_url is None:
                b=False
                server_process.terminate()
        server_process.join()
        d.quit()
        print("Server stopped")

    except KeyboardInterrupt:
        print("Server stopped")

    except Exception:
        print("Server error")


if __name__ == "__main__":
    main()
