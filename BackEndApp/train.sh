#!/bin/bash
echo 'in script'
# cd '/home/sam/BE/FOSS/Generator/BackEndApp/'
source /home/$USER/anaconda3/etc/profile.d/conda.sh
conda activate generator
echo 'activated env'
#python '/home/sam/BE/FOSS/Generator/BackEndApp/test.py'
python test.py
