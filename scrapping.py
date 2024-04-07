
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.common.action_chains import ActionChains

def ProceedAccounts():

    options = Options()
    proxy_server_url = "157.245.97.60"
    options.add_argument(f'--proxy-server={proxy_server_url}')

    driver = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()),
        options=options
    )
    driver.set_window_position(0, 0)

    driver.get("https://www.lacentrale.fr/auto-occasion-annonce-69113554337.html")

    title = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME,"SummaryInformation_title__g1gNY")))
    print("Title:", title)

ProceedAccounts()
