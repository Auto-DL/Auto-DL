#!/bin/bash

source /home/$USER/anaconda3/etc/profile.d/conda.sh
conda activate generator
echo 'activated env'
python test.py
