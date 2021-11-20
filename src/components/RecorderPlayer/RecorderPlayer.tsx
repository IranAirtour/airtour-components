import React, {useCallback} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Icon, ScreenUtils} from 'airtour-components';
import {GlobalStyles} from 'airtour-components/globalStyles';
const BUTTON_WIDTH = ScreenUtils.width * 0.09;
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
} from 'react-native-track-player';
import {TrackPlayerClient} from '../../utils/TrackPlayer';
const TRACK_PLAYER_BAR_WIDTH = ScreenUtils.width * 0.44;
function RecorderPlayer(props: any) {
  const {containerStyle = {}, audio, fileName} = props;
  const playbackState = usePlaybackState();
  const progress = useTrackPlayerProgress(1000, [
    TrackPlayer.STATE_PLAYING,
    TrackPlayer.STATE_BUFFERING,
    TrackPlayer.STATE_PAUSED,
  ]);
  const playTrack = useCallback(
    (cb?: () => void) => {
      TrackPlayerClient.playTrack({
        url: audio as string,
        title: fileName as string,
        id: audio,
        artist: 'Air Tour',
      }).finally(() => {
        cb && cb();
      });
    },
    [audio, fileName],
  );
  const thisIsCurrentTrackIsPlaying: boolean =
    TrackPlayerClient.getCurrentTrackId() === audio;
  return (
    <View
      style={StyleSheet.flatten([
        GlobalStyles.flexRow,
        GlobalStyles.fullCenter,
        styles.container,
        containerStyle,
        // {flex:2,backgroundColor:'green'}
      ])}>
      <View
        style={StyleSheet.flatten([
          GlobalStyles.flex1,
          GlobalStyles.fullCenter,
        ])}>
        <Button
          type={'clear'}
          containerStyle={StyleSheet.flatten([
            {
              height: BUTTON_WIDTH,
            },
            GlobalStyles.flexRow,
            GlobalStyles.flex1,
            GlobalStyles.fullCenter,
          ])}
          raised={false}
          onPress={() => {
            if (thisIsCurrentTrackIsPlaying) {
              if (playbackState !== TrackPlayer.STATE_PLAYING) {
                playTrack();
              } else {
                TrackPlayerClient.pause();
              }
            } else {
              playTrack();
            }
          }}
          icon={
            <Icon
              type={'material-community'}
              size={BUTTON_WIDTH * 0.7}
              color={'#297922'}
              name={
                thisIsCurrentTrackIsPlaying
                  ? playbackState === TrackPlayer.STATE_PLAYING ||
                    playbackState === TrackPlayer.STATE_BUFFERING
                    ? 'play'
                    : 'pause'
                  : 'pause'
              }
              containerStyle={styles.playButton}
            />
          }
        />
      </View>
      <View style={StyleSheet.flatten([GlobalStyles.fullCenter, {flex: 7}])}>
        <TouchableWithoutFeedback
          onPress={event => {
            // duration = >   TRACK_PLAYER_BAR_WIDTH
            //   ?      = > locationX
            const touchedSecond =
              (progress.duration * event.nativeEvent.locationX) /
              TRACK_PLAYER_BAR_WIDTH;
            if (!thisIsCurrentTrackIsPlaying) {
              playTrack(() => {
                TrackPlayerClient.seekTo(touchedSecond);
              });
            } else {
              TrackPlayerClient.seekTo(touchedSecond);
            }
            TrackPlayerClient.seekTo(touchedSecond);
          }}>
          <View style={styles.progress}>
            <View
              style={{
                flex: thisIsCurrentTrackIsPlaying ? progress.position : 0,
                backgroundColor: '#74a867',
              }}
            />
            <View
              style={{
                flex: thisIsCurrentTrackIsPlaying
                  ? progress.duration - progress.position
                  : 0,
                backgroundColor: '#eeeeee',
                height: 4,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
export {RecorderPlayer};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ScreenUtils.height * 0.05,
    elevation: 1,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 5,
  },
  playButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    marginLeft: BUTTON_WIDTH * 0.5,
    marginTop: BUTTON_WIDTH * 0.25,
  },
  progress: {
    height: 4,
    width: TRACK_PLAYER_BAR_WIDTH,
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
  },
});
