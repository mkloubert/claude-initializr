// Copyright © 2026 Marcel Joachim Kloubert <marcel@kloubert.dev>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isRtlLanguage } from '@/i18n';
import {
  Box,
  Container,
  FileCode,
  FileText,
  Heart,
  Info,
  Shield,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ThemeSwitcher, LanguageSwitcher } from '@/components/common';
import { useConfig } from '@/contexts';
import { PAYPAL_URL, AUTHOR_URL } from '@/config/env';
import type { SectionId } from '@/hooks/useActiveSection';
import logoImage from '@/assets/logo.png';

interface AppSidebarProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  onOpenAbout?: () => void;
}

interface SidebarNavItem {
  id: SectionId;
  labelKey: string;
  icon: typeof FileCode;
}

const NAV_ITEMS: SidebarNavItem[] = [
  { id: 'dockerfile', labelKey: 'sidebar.dockerfile', icon: FileCode },
  { id: 'docker-compose', labelKey: 'sidebar.dockerCompose', icon: Container },
  { id: 'claude-md', labelKey: 'sidebar.claudeMd', icon: FileText },
  { id: 'settings', labelKey: 'sidebar.settings', icon: Shield },
  { id: 'devcontainer', labelKey: 'sidebar.devContainer', icon: Box },
];

export function AppSidebar({ activeSection, onSectionChange, onOpenAbout }: AppSidebarProps) {
  const { t, i18n } = useTranslation();
  const { config } = useConfig();
  const isRtl = isRtlLanguage(i18n.language);

  const enabledSoftwareCount = useMemo(() => {
    return Object.values(config.software).filter((s) => s.enabled).length;
  }, [config.software]);

  const devContainerEnabled = config.devContainer.enabled;

  return (
    <Sidebar collapsible="icon" side={isRtl ? 'right' : 'left'}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <span>
                <img
                  src={logoImage}
                  alt=""
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
                <span className="font-semibold truncate">{t('app.title')}</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.configuration')}</SidebarGroupLabel>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => onSectionChange(item.id)}
                    tooltip={t(item.labelKey)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{t(item.labelKey)}</span>
                  </SidebarMenuButton>
                  {item.id === 'dockerfile' && enabledSoftwareCount > 0 && (
                    <SidebarMenuBadge>{enabledSoftwareCount}</SidebarMenuBadge>
                  )}
                  {item.id === 'devcontainer' && (
                    <SidebarMenuBadge>
                      {devContainerEnabled ? 'ON' : 'OFF'}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.actions')}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onOpenAbout} tooltip={t('sidebar.about')}>
                <Info aria-hidden="true" />
                <span>{t('sidebar.about')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {PAYPAL_URL && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t('sidebar.donate')}>
                  <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
                    <Heart aria-hidden="true" />
                    <span>{t('sidebar.donate')}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-center gap-1 group-data-[collapsible=icon]:flex-col">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <p className="text-center text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            {t('sidebar.copyright')}
          </a>
        </p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
