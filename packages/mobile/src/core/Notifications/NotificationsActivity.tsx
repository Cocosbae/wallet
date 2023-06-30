import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button, Icon, Screen, Text, View } from '$uikit';
import { useNotificationsStore } from '$store/zustand/notifications/useNotificationsStore';
import { Notification } from '$core/Notifications/Notification';
import { Steezy } from '$styles';
import { openNotifications } from '$navigation';
import { t } from '$translation';
import { INotification } from '$store';
import { FlashList } from '@shopify/flash-list';
import { LayoutAnimation } from 'react-native';

export enum ActivityListItem {
  Notification = 'Notification',
  Title = 'Title',
}

export function getNewNotificationsCount(
  notifications: INotification[],
  lastSeenAt: number,
) {
  return notifications.findIndex((notification) => notification.received_at < lastSeenAt);
}

export const NotificationsActivity: React.FC = () => {
  const notifications = useNotificationsStore((state) => state.notifications);
  const lastSeenAt = useNotificationsStore((state) => state.last_seen);
  const updateLastSeen = useNotificationsStore((state) => state.actions.updateLastSeen);
  const list = useRef<FlashList<Element | null> | null>(null);
  const closeOtherSwipeable = useRef<null | (() => void)>(null);

  const handleOpenNotificationSettings = useCallback(() => {
    openNotifications();
  }, []);

  const flashListData = useMemo(() => {
    const items: any = notifications
      .sort((a, b) => b.received_at - a.received_at)
      .map((notification) => {
        return {
          type: ActivityListItem.Notification,
          id: notification.received_at,
          item: notification,
        };
      });

    const indexToPushTitle = getNewNotificationsCount(notifications, lastSeenAt);

    // divide notifications into two groups: earlier and not seen before
    if (![0, -1].includes(indexToPushTitle)) {
      items.splice(indexToPushTitle, 0, {
        type: ActivityListItem.Title,
        id: 'earlier_title',
        item: t('notifications.earlier'),
      });
    }

    return items;
  }, [lastSeenAt, notifications]);

  useEffect(() => {
    return () => {
      updateLastSeen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = useCallback(() => {
    list.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [list]);

  const renderNotificationsItem = useCallback(
    (props) => {
      switch (props.item.type) {
        case ActivityListItem.Title:
          return (
            <View style={styles.titleStyle}>
              <Text variant={'h3'}>{props.item.item}</Text>
            </View>
          );
        case ActivityListItem.Notification:
          return (
            <Notification
              closeOtherSwipeable={closeOtherSwipeable}
              onRemove={handleRemove}
              notification={props.item.item}
            />
          );
        default:
          return null;
      }
    },
    [handleRemove],
  );

  return (
    <Screen>
      <Screen.Header
        rightContent={
          <Button
            onPress={handleOpenNotificationSettings}
            size="navbar_icon"
            mode="secondary"
            before={<Icon name="ic-sliders-16" color="foregroundPrimary" />}
          />
        }
        title={'Notifications'}
      />
      <Screen.FlashList
        ref={list}
        estimatedItemSize={87}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationsItem}
        contentContainerStyle={{ paddingBottom: 8 }}
        data={flashListData}
      />
    </Screen>
  );
};

const styles = Steezy.create({
  titleStyle: {
    marginVertical: 14,
    marginHorizontal: 16,
  },
});
