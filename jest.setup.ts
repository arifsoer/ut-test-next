/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

(global as any).TextDecoder = TextDecoder;
(global as any).TextEncoder = TextEncoder;

import "@/utils/general-mock";
