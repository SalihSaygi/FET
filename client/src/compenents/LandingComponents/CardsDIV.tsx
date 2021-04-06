import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OptionCard from './OptionCard';
import data from './CardData';
import useWindowPosition from '../../hooks/useWindowPosition';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function CardsDIV(): JSX.Element {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="options">
      <OptionCard card={data[1]} checked={checked} />
      <OptionCard card={data[0]} checked={checked} />
    </div>
  );
}