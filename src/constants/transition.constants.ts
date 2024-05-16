export const DURATION = 300;

export const DEF_STYLES = {
  transition: `opacity ${DURATION}ms ease-in-out`,
  opacity: 0,
};

export const TRANS_STYLES: any = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
