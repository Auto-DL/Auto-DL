#!/bin/bash

source /home/$USER/anaconda3/etc/profile.d/conda.sh
conda activate autodl
echo 'activated env'
python test.py
