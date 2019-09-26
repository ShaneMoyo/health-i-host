import React from 'react';
import Promo from '../utils/Promo';
import {  mdiRun } from '@mdi/js'

export default function Movement (){

  const text = [
    'Movement',
    `The body’s goal is to be in a limitless, flowing, and unrestricted Neutral to function at its best.`,
    'Consultations may be done in person, online via Zoom, or by telephone. We will review your data to understand your current mineral status. From this we will discuss the specific steps of the Root Cause Protocol and how to proceed. You will be given a recording of our session together for future reference.'
  ]
  return <div>
          <Promo header1={text[0]} header2={text[1]} header3={text[2]} icon={mdiRun} color='success'/>
        </div>
}
