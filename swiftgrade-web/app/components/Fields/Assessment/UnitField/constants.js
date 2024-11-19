export const CONFIG = id => ({
  substituteTextarea: () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('autocapitalize', 'off');
    textarea.setAttribute('autocomplete', 'off');
    textarea.setAttribute('autocorrect', 'off');
    textarea.setAttribute('spellcheck', false);
    textarea.setAttribute('x-palm-disable-ste-all', true);

    return textarea;
  },
  id,
  autoCommands: 'mu Omega',
  autoOperatorNames: 'arcsin',
  spaceBehavesLikeTab: true,
});
