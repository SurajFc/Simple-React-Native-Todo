import React from "react";
import { Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HiddenItemWithActions = props => {
  const {
    swipeAnimatedValue,
    leftActionActivated,
    rightActionActivated,
    rowActionAnimatedValue,
    rowHeightAnimatedValue,
    onClose,
    onDelete,
  } = props;

  if (rightActionActivated) {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 500,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 75,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
      <Text>Left</Text>
      {!leftActionActivated && (
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={onClose}
        >
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={25}
            style={styles.trash}
            color="#fff"
          />
        </TouchableOpacity>
      )}
      {!leftActionActivated && (
        <Animated.View
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            {
              flex: 1,
              width: rowActionAnimatedValue,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={onDelete}
          >
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-90, -45],
                        outputRange: [1, 0],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={25}
                color="#fff"
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  items: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteButton: {
    height: 50,
    width: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignContent: "center",
    padding: 15,
    color: "white",
    borderRadius: 10,
  },
  cancelButton: {
    height: 50,
    width: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignContent: "center",
    padding: 15,
    marginRight: 5,
    color: "white",
    borderRadius: 10,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
    borderRadius: 10,
    marginRight: 5,
    height: 48,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderRadius: 10,
    height: 48,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
});

export default HiddenItemWithActions;
