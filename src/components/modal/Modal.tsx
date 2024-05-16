"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import { DEF_STYLES, TRANS_STYLES, DURATION } from '@/constants'
import styles from "./modal.module.scss";

interface IProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  selector: string;
}

export const Modal = (props: IProps) => {
  const { selector, show, onClose, children } = props;

  const nodeRef = useRef<Element | null>(null);
  const transitionRef = useRef<any | null>(null);

  const [showDelay, setShowDelay] = useState(false);

  useEffect(() => {
    nodeRef.current = document.getElementById(selector);
  }, [selector]);

  useEffect(() => {
    if (show) {
      setShowDelay(true);
    }
  }, [show]);

  const closeModal = useCallback(() => {
    setShowDelay(false);

    setTimeout(() => {
      onClose();
    }, DURATION);
  }, [onClose, setShowDelay]);

  const clickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();

      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  return show && nodeRef.current
    ? createPortal(
        <Transition nodeRef={transitionRef} in={showDelay} timeout={DURATION}>
          {(state) => {
            console.log(state);
            return (
              <div
                className={styles.modalBox}
                onClick={clickOutside}
                ref={transitionRef}
                style={{
                  ...DEF_STYLES,
                  ...TRANS_STYLES[state],
                }}
              >
                <div className={styles.modal}>
                  <button
                    onClick={closeModal}
                    className={styles.modal__closeBtn}
                  >
                    Close
                  </button>
                  <div className={styles.modal__content}>{children}</div>
                </div>
              </div>
            );
          }}
        </Transition>,
        nodeRef.current
      )
    : null;
};
