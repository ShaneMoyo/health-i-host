import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react';

const NavBarLink = props => <NavLink {...props} className="nav-link tile is-parent" activeClassName="active"/>;

export default function ServiceTile(props) {
  const { icon, color, link, title } = props;
  const className = `tile is-child notification has-text-white is-${color} grow`;

  return <NavBarLink exact to={link}>
          <article class={className}>
            <span class="icon is-large is-pulled-left" >
              <Icon path={icon}
              size={2}
              color="white"
              />
            </span>
            <p class="title">{title}</p>
            <br/>
            <p class="subtitle">Learn More</p>
          </article>
        </NavBarLink>;

}
