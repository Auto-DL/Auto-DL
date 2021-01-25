# Installation

To use the application you need to follow the steps below successfully install the application and run it  

__Downloading the project__
* Go to : [Auto-DL project](https://github.com/Auto-DL/Generator) 
* click on the green coloured Download button (code button)
  Select option download as zip 

__Extracting__
* After downloading the .zip file, Extract the file using winzip or any application that can extract the .zip files.  
  After extracting the file follow next steps.

__Installation of the required modules__

* Then go to your Generator folder in project directory as follows 
* Right click on project folder and open the properties.
* Copy the path mentioned in the box.

* After copying path, Go to the terminal of your windows operating system or terminal of Linux operating system.
* To go to terminal use search option in windows.
  Type 'cmd' in  search feild. 
* Right click on command prompt and select "Run as administrator option" 

* then type following command   
* <code>cd path</code>
* paste the path you copied in above command 
* Example : 
```cd C:\Auto-DL\Generator ```

* There will be requirements.txt file in generator folder. It contains list of the required modules for successful operation of the application.

* To install the required modules type the following command in terminal 
```pip install -r requirements.txt```


__After installation of requied modules, you need to install node package manager(npm) to run front end application__
To install npm follow the following steps 

* Go to [npm](https://nodejs.org/en/download/) site
* download the package according to your system
* Install by doing simple next-yes-next yes. 

__after that go to path in CMD mentioned below and do following steps to run the application__

* To start the backend server traverse to the path in cmd.
* <code>\Auto-DL\Generator\BackEnd\</code>
Type 
```python manage.py server```
This will start the backend server. 
* <code>\Auto-DL\Generator\FrontEnd\v1-react</code>
* after tracersing to this path in cmd type
```npm install``
```npm start```
* This will start front end app
* type 
<code>http://127.0.0.1:3000</code> in your browser