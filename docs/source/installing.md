# Installation
!["alt"](./_static/adl_generator.png "account")
- To use the application you need to follow the steps below successfully install the application and run it. 

__Downloading the project__ (Not recommended)
* Go to the : [Auto-DL project](https://github.com/Auto-DL/Auto-DL) 
* Click on the green colored Download button (code button)
  Select option which says ```download as zip``` 

__Extracting__ (Not recommended)
* After downloading the .zip file, Extract the file using WinZip or any application that can extract the .zip files.  
  After extracting the file follow the next steps.

__Clone the project__ (Recommended)
* Go to the : [Auto-DL project](https://github.com/Auto-DL/Auto-DL) 
* Click on the green colored Download button (code button)
  Select any option out of `HTTPS`, `GIT` or `GITHUB CLI` and copy the command.
* Open up a terminal and type `git clone` and paste the command copied in the previous step.

__Installation of the required modules__

* Then go to your Auto-DL folder in the project directory as follows 
* Right-click on the project folder and open the properties.
* Copy the path mentioned in the box.

* After copying the path, Go to the terminal of your windows operating system or terminal of the Linux operating system.
* To go to the terminal use search option in windows.
  Type 'cmd' in  the search field. 
* Right-click on the command prompt and select "Run as administrator option" 

* then type the following command   
* <code>cd path</code>
* paste the path you copied in the above command 
* Example: 
```cd C:\Auto-DL\Auto-DL ```

* There will be a requirements.txt file in the Auto-DL folder. It contains a list of the required modules for the successful operation of the application.

* To install the required modules type the following command in terminal 
```pip install -r requirements.txt```

* Go to [npm](https://nodejs.org/en/download/) site

* download the package according to your system

* Install by doing simple next-yes-next yes. 


__Getting the .env File__
* Auto-DL team has created an environment file for its contributers.
* Download [the file](https://drive.google.com/file/d/15zGH1D_Uy3ZBWy4s873L9We5arpI7ls6/view?usp=sharing) and paste it in `Auto-DL/BackEndApp` directory.
* **NOTE:** Make sure the name of the file is `.env` (that " . " is important)


__Running the Project__
* To start the backend server traverse to the path in cmd: ```\Auto-DL\Auto-DL\BackEndApp\```

* Type 
```python manage.py runserver``` This will start the backend server

* Go to: ```\Auto-DL\Auto-DL\FrontEndApp\v1-react```

* Type commands:
  ```sh
    npm install
    npm start
  ```
* Go to `http://127.0.0.1:3000` in your browser
