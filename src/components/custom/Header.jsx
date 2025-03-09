import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Link, NavLink } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    console.log(user);
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Google login handler
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  // Fetch user profile after Google login
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json',
        },
      })
      .then((resp) => {
        console.log('Google User Info:', resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false); // Close the dialog after successful login
        window.location.reload();
      })
      .catch((error) => {
        console.log('Error fetching user profile:', error);
      });
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg' />
      <div className='flex items-center gap-4'>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className='p-2 rounded-full bg-white dark:bg-[#030712] transition-transform duration-[1000ms] ease-in-out'
          style={{ transform: isDarkMode ? 'rotate(360deg)' : 'rotate(0deg)' }}
        >
          {isDarkMode ? <Sun color='#f97316' /> : <Moon color='#f97316' />}
        </button>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-plan'>
              <Button variant="outline" className="rounded-full transition-all duration-500 hover:shadow-orange-glow">
                Get Career Advice
              </Button>
            </a>
            <a href='/my-plan'>
              <Button variant="outline" className="rounded-full transition-all duration-500 hover:shadow-orange-glow">
                Past Queries
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[40px] w-[40px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent className="animate-bounceIn">
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent className="transition-transform duration-700 ease-out transform scale-95">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>To continue, you must have a Gmail ID for authentication.</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
              {/* Cancel Button to Close Dialog */}
              <Button onClick={() => setOpenDialog(false)} className="w-full mt-2">
                Cancel
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
