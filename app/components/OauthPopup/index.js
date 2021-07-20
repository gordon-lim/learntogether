/**
 *
 * OauthPopup
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const createPopup = ({ url, title, height, width }) => {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2.5;
  const externalPopup = window.open(
    url,
    title,
    `width=${width},height=${height},left=${left},top=${top}`,
  );
  return externalPopup;
};

const OauthPopup = ({
  title = '',
  width = 500,
  height = 500,
  url,
  children,
  onCode,
  onClose,
}) => {
  const [externalWindow, setExternalWindow] = useState();
  const intervalRef = useRef();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const onContainerClick = () => {
    setExternalWindow(
      createPopup({
        url,
        title,
        width,
        height,
      }),
    );
  };

  useEffect(() => {
    if (externalWindow) {
      intervalRef.current = window.setInterval(() => {
        try {
          const currentUrl = externalWindow.location.href;
          const params = new URL(currentUrl).searchParams;
          const code = params.get('code');
          if (!code) {
            return;
          }
          onCode(code, params);
          clearTimer();
        } catch (error) {
          // eslint-ignore-line
        } finally {
          if (!externalWindow || externalWindow.closed) {
            onClose();
            clearTimer();
          }
        }
      }, 3000);
    }
    return () => {
      if (externalWindow) externalWindow.close();
      if (onClose) onClose();
    };
  }, [externalWindow]);

  return (
    // eslint-disable-next-line
    <div
      onClick={() => {
        onContainerClick();
      }}
    >
      {children}
    </div>
  );
};

OauthPopup.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.object,
  onCode: PropTypes.func,
  onClose: PropTypes.func,
};

export default OauthPopup;
