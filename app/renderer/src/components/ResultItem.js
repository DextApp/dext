import React, { PropTypes } from 'react';
import { style, compose, hover } from 'glamor';
import Icon from './Icon';
import { ResultItemSchema, ThemeSchema } from '../schema';

const activeStyle = {
  backgroundColor: '#3f93fe',
  color: '#ffffff',
};

const baseHover = hover(activeStyle);

const base = compose(
  style({
    display: 'flex',
    color: '#333',
    boxSizing: 'border-box',
    height: 60,
    margin: 0,
    padding: 10,
    width: '100%',
  }),
  baseHover
);

const icon = style({
  flex: 'content',
  boxSizing: 'border-box',
  marginRight: 10,
});

const details = style({
  flex: 'flex-grow',
  boxSizing: 'border-box',
});

const title = style({
  display: '-webkit-box',
  boxSizing: 'border-box',
  overflow: 'hidden',
  fontSize: 16,
  fontWeight: 'normal',
  margin: 0,
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
});

const subtitle = style({
  display: '-webkit-box',
  boxSizing: 'border-box',
  overflow: 'hidden',
  fontSize: 12,
  fontWeight: 'normal',
  margin: 0,
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
});

const ResultItem = ({ theme, selected, item, isAltMod, isMetaMod, onDoubleClick }) => {
  const themeBase = style(theme.result || {});
  const themeHover = hover(theme.resultActive || {});

  const themeSelected = selected
    ? compose(
      style(activeStyle),
      style(theme.resultActive || {})
    )
    : {};

  let itemSubtitle = item.subtitle;

  // apply modifiers if necessary
  if (isMetaMod) {
    itemSubtitle = item.mods && item.mods.cmd && item.mods.cmd.subtitle;
  } else if (isAltMod) {
    itemSubtitle = item.mods && item.mods.alt && item.mods.alt.subtitle;
  }

  return (
    <li {...compose(base, themeBase, themeHover, themeSelected)} onDoubleClick={onDoubleClick}>
      <div {...icon}>
        <Icon icon={item.icon} />
      </div>
      <div {...details}>
        <h2 {...compose(title, theme.resultTitle || {})}>{item.title}</h2>
        <h3 {...compose(subtitle, theme.resultSubtitle || {})}>{itemSubtitle}</h3>
      </div>
    </li>
  );
};

ResultItem.propTypes = {
  theme: ThemeSchema,
  // item prop should follow the Alfred workflow script filter JSON format
  // https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
  item: ResultItemSchema,
  selected: PropTypes.bool,
  isAltMod: PropTypes.bool,
  isMetaMod: PropTypes.bool,
  onDoubleClick: PropTypes.func,
};

export default ResultItem;
