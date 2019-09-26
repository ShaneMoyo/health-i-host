import React from 'react';
import Promo from '../utils/Promo';
import {  mdiHumanHandsup } from '@mdi/js'

export default function Massage() {
  const text = [
    'Massage',
    'An intuitive art form rooted in scientific and experiential hands on healing to allow the body to move freely in its surroundings.',
    'Stress can take a toll on your body, and even though your body works hard to keep up, it needs help. Keeping your body running efficiently should be high on your to-do list and regular massage is key to operating at peak efficiency. Keeping your body in optimal working condition with routine massage - along with Rapid Tension Relief and Total Body Stretch - is easy at any Massage Envy franchised location.'
  ]

  return <div>
            <Promo header1={text[0]} header2={text[1]} header3={text[2]} icon={mdiHumanHandsup} color='primary'/>
          </div>
}
