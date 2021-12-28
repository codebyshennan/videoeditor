import { createContext, useState } from 'react';

export const TranscriptionContext = createContext()
export const UserContext = createContext({ user: null, username: null });
export const ffmpegContext = createContext({ ffmpeg });
export const AppContext = createContext()
export const FileContext = createContext()
export const ProcessingContext = createContext()