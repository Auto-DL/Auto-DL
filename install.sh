# initialize DLMML submodule
git submodule init
git submodule update

# frontend setup
cd FrontEndApp/v1-react
npm install

# backend setup
pip install -r requirements.txt
