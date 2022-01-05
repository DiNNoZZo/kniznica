import React, { useState } from 'react';

import Typography from '../ui/typography';
import Button from '../ui/button';
import Link from '../ui/link';
import Logo from '../ui/logo';
import classes from './navbar.module.scss';

function Navbar() {
  const [lang, setLang] = useState('English');

  const hadleChangeLang = (e) => {
    setLang(e.target.value);
  };
  return (
    <header className={classes.navbar}>
      <div className={classes.title}>
        <Logo />
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/">
              <Button type="button" variant="default">
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/libraries">
              <Button type="button" variant="default">
                Libraries
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/books">
              <Button type="button" variant="default">
                Books
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/students">
              <Button type="button" variant="default">
                Students
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.footer}>
        <div className={classes.web_creator}>
          <Logo />
          <Typography variant="subtitle2">
            {new Date().getFullYear()} Ján Vlčko
          </Typography>
        </div>
        <div className={classes.sub_footer}>
          <div className={classes.usefull_link}>
            <Link href="#">
              <Typography variant="body2">Terms of Service</Typography>
            </Link>
          </div>
          <div className={classes.usefull_link}>
            <Link href="#">
              <Typography variant="body2">Imprint</Typography>
            </Link>
          </div>
          <div className={classes.usefull_link}>
            <Link href="#">
              <Typography variant="body2">Privacy</Typography>
            </Link>
          </div>
        </div>
        <div className={classes.lang}>
          <select name="lang" value={lang} onChange={hadleChangeLang}>
            <option>Czech</option>
            <option>Deutsch</option>
            <option>English</option>
            <option>Italiano</option>
            <option>Slovakia</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
