from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.chrome.service import Service as ChromeService
# from webdriver_manager.chrome import ChromeDriverManager
from fake_useragent import UserAgent
# from selenium.webdriver.common.action_chains import ActionChains

def ProceedAccounts(url):

    options = Options()

    user_agent = UserAgent().random
    options = webdriver.ChromeOptions()
    options.add_argument(f'user-agent={user_agent}')

    driver = webdriver.Chrome(options=options)
    driver.set_window_position(0, 0)

    driver.get(url)

    title = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME,"SummaryInformation_title__g1gNY")))
    price = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CLASS_NAME,"PriceInformation_classifiedPrice__mPnBd")))

    print("Title:", title)
    print("Price:", price)

ProceedAccounts("https://www.lacentrale.fr/auto-occasion-annonce-69113554337.html")
