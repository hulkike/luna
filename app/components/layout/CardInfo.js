/* eslint-disable react/require-default-props */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */

import React, { useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, oneOfType, oneOf, string, node } from 'prop-types';
import cn from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import WarningIcon from '@material-ui/icons/WarningOutlined';
import UpdateIcon from '@material-ui/icons/UpdateOutlined';
import BalotIcon from '@material-ui/icons/BallotOutlined';
import BarChartIcon from '@material-ui/icons/BarChartOutlined';

import { switchcase } from 'commons/utils';

import styles from './styles/cardInfo';

const defaultStatIcon = null;

const AppCardInfo = props => {
  const {
    classes,
    className,
    title,
    description,
    small,
    text,
    color,
    link,
    type
  } = props;

  const infoStatIcon = (
    <BalotIcon
      className={cn(classes.cardStatsIcon, classes[`${color}CardStatsIcon`])}
    />
  );

  const barStatIcon = (
    <BarChartIcon
      className={cn(classes.cardStatsIcon, classes[`${color}CardStatsIcon`])}
    />
  );
  const updateStatIcon = (
    <UpdateIcon
      className={cn(classes.cardStatsIcon, classes[`${color}CardStatsIcon`])}
    />
  );
  const warningStatIcon = (
    <WarningIcon
      className={cn(classes.cardStatsIcon, classes[`${color}CardStatsIcon`])}
    />
  );

  const renderStatIcon = useCallback(cardType => {
    const icon = switchcase({
      info: () => infoStatIcon,
      stats: () => barStatIcon,
      update: () => updateStatIcon,
      warning: () => warningStatIcon
    })(defaultStatIcon)(cardType);

    return icon;
  }, []);

  return (
    <Card
      className={cn(classes.card, {
        [className]: Boolean(className)
      })}
    >
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          {description}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {type && renderStatIcon(type)}
        {link !== undefined ? (
          <a href={link.href} className={classes.cardStatsLink}>
            {link.text}
          </a>
        ) : text !== undefined ? (
          <small className={classes.text}>{text}</small>
        ) : null}
      </CardActions>
    </Card>
  );
};

AppCardInfo.propTypes = {
  classes: objectOf(string).isRequired,
  title: node.isRequired,
  description: node.isRequired,
  small: node,
  color: oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  text: oneOfType([string, node]),
  className: string,
  link: string,
  type: string
};

export default withStyles(styles)(AppCardInfo);
