import PropTypes from 'prop-types';
import React from 'react';
import { style, compose, hover } from 'glamor';
import IconWrapper from '../icon-wrapper';

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
    position: 'relative',
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
  flexGrow: 2,
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

const checkAnimation = style.keyframes('check', {
  '0%': { height: 0, width: 0, opacity: 1 },
  '20%': { height: 0, width: '6px', opacity: 1 },
  '40%': { height: '12px', width: '6px', opacity: 1 },
  '100%': { height: '12px', width: '6px', opacity: 1 },
});

const checkmarkWrapper = style({
  width: '80px',
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translateY(-50%)',
  paddingRight: '20px',
});

const checkmark = style({
  animationDuration: '.3s',
  animationTimingFunction: 'ease',
  animationName: `${checkAnimation}`,
  transform: 'scaleX(-1) rotate(135deg)',
  height: '12px',
  width: '6px',
  transformOrigin: 'left top',
  borderRight: '2px solid white',
  borderTop: '2px solid white',
  content: '""',
  position: 'relative',
  top: '7px',
  marginLeft: '7px',
});

export class ResultItem extends React.PureComponent {
  static displayName = 'ResultItem';
  static defaultProps = {
    copiedToClipboard: false,
    item: {},
    keys: [],
    selected: false,
    theme: {},
  };
  static propTypes = {
    theme: PropTypes.object,
    // item prop should follow the Alfred workflow script filter JSON format
    // https://www.alfredapp.com/help/workflows/inputs/script-filter/json/
    item: PropTypes.object,
    selected: PropTypes.bool,
    keys: PropTypes.arrayOf(PropTypes.string),
    copiedToClipboard: PropTypes.bool,
  };
  isAltMod() {
    return (
      this.props.selected &&
      this.props.keys &&
      this.props.keys.indexOf('alt') > -1
    );
  }

  isSuperMod() {
    return (
      this.props.selected &&
      this.props.keys &&
      this.props.keys.indexOf('meta') > -1
    );
  }

  execute = () => {
    const { item } = this.props;
    const { action } = item;
    ipcRenderer.send(IPC_EXECUTE_ITEM, {
      action,
      item,
      isAltMod: this.isAltMod(),
      isSuperMod: this.isSuperMod(),
    });
  };
  render() {
    const { theme, item, selected, copiedToClipboard } = this.props;
    const themeBase = style(theme.result || {});
    const themeHover = hover(theme.resultActive || {});

    const themeSelected = selected
      ? compose(
          style(activeStyle),
          style(theme.resultActive || {})
        )
      : {};

    // apply modifiers if necessary
    const itemSubtitle =
      (this.isSuperMod() &&
        item.mods &&
        item.mods.cmd &&
        item.mods.cmd.subtitle) ||
      (this.isAltMod() &&
        item.mods &&
        item.mods.alt &&
        item.mods.alt.subtitle) ||
      item.subtitle;

    return (
      <li
        {...compose(
          base,
          themeBase,
          themeHover,
          themeSelected
        )}
        onDoubleClick={this.execute}
      >
        <div {...icon}>
          <IconWrapper wrapper />
        </div>
        <div {...details}>
          <h2
            {...compose(
              title,
              theme.resultTitle || {}
            )}
          >
            {item.title}
          </h2>
          <h3
            {...compose(
              subtitle,
              theme.resultSubtitle || {}
            )}
          >
            {itemSubtitle}
          </h3>
        </div>
        {copiedToClipboard && selected ? (
          <div {...checkmarkWrapper}>
            <span>Copied</span>
            <div {...checkmark} />
          </div>
        ) : null}
      </li>
    );
  }
}

export default ResultItem;
