import { IconButton, MenuItem, Divider, Menu } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const UserAccountMenu: React.FunctionComponent = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleOpen}>
        <AccountBoxIcon />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        getContentAnchorEl={null}
      >
        <MenuItem disabled>
          {(keycloak?.idTokenParsed as any).family_name}
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => router.push('/logout')}>Logout</MenuItem>
      </Menu>
    </>
  );
};
