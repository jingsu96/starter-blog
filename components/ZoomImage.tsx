'use client';

import { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';

const ZoomImage = ({ ...rest }: ImageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root onOpenChange={(o) => setOpen(o)}>
      <Dialog.Trigger className="">
        <NextImage className="rounded-[12px] shadow-jt2" {...rest} />
      </Dialog.Trigger>
      <AnimatePresence initial={false}>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 cursor-pointer bg-black/50 backdrop-blur-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              ></motion.div>
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="bg-grey-11 fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 !transform-gpu lg:w-auto"
              >
                <NextImage className="mx-auto rounded-[12px] shadow-jt4" {...rest} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default ZoomImage;
