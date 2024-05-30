'use client';

import { Command } from 'lucide-react';

import { MenuContent } from '@/components/lab/menu-content';
import { Button } from '@/components/lab/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/lab/ui/drawer';

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle drawer">
          <Command size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-4/5 border-none bg-bg-alt shadow-jt1 outline-none">
        <div className="overflow-y-auto p-4">
          <MenuContent from={'Drawer'} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
