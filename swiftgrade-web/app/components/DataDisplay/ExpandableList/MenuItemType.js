class MenuItemType {
  constructor({
    className = null,
    icon = null,
    iconClasses = null,
    message = null,
    onClick = null,
    onMouseEnter = null,
    onMouseLeave = null,
    tooltipMessage = null,
    dropDownList = null,
    activeIcon = null,
  } = {}) {
    this.key = Math.floor(Math.random() * 1000000);

    this.className = className;
    this.icon = icon;
    this.iconClasses = iconClasses;
    this.message = message;
    this.onClick = onClick;
    this.onMouseEnter = onMouseEnter;
    this.onMouseLeave = onMouseLeave;
    this.tooltipMessage = tooltipMessage;
    this.dropDownList = dropDownList;
    this.activeIcon = activeIcon;
  }

  getItemInfo() {
    return {
      className: this.className,
      icon: this.icon,
      activeIcon: this.activeIcon,
      message: this.message,
      onClick: this.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      tooltipMessage: this.tooltipMessage,
      dropDownList: this.dropDownList,
    };
  }

  isHaveDropDownList() {
    return Boolean(this.dropDownList);
  }
}

export default MenuItemType;
