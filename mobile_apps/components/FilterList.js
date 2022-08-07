import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import filterStyle from "../styles/filterStyle";

const FilterList = ({ onCollapse }) => {
  const [checked, setChecked] = useState({
    item1: true,
    item2: false,
    item3: false,
  });

  const onChecked = item => {
    if (item === "item1") {
      setChecked({
        item1: true,
        item2: false,
        item3: false,
      });
    }
    if (item === "item2") {
      setChecked({
        item1: false,
        item2: true,
        item3: false,
      });
    }
    if (item === "item3") {
      setChecked({
        item1: false,
        item2: false,
        item3: true,
      });
    }
  };

  return (
    <View style={filterStyle.fitlerBackDrop}>
      <View style={filterStyle.filterContainer}>
        <View style={filterStyle.filterRow}>
          <TouchableOpacity onPress={onCollapse}>
            <Image
              style={{ width: 10, height: 10 }}
              source={require("../assets/icons/close-icon.svg")}
            />
          </TouchableOpacity>
          <Text style={filterStyle.filterHeader}>Sort by</Text>
        </View>
        <View style={{ marginTop: 4 }}>
          <FilterItem
            label={"Today"}
            active={checked.item1}
            onActive={() => onChecked("item1")}
          />
          <FilterItem
            label={"Week"}
            active={checked.item2}
            onActive={() => onChecked("item2")}
          />
          <FilterItem
            label={"Month"}
            active={checked.item3}
            onActive={() => onChecked("item3")}
          />
        </View>
      </View>
    </View>
  );
};

const FilterItem = ({ label, active, onActive }) => {
  return (
    <TouchableOpacity onPress={onActive}>
      <View
        style={[
          filterStyle.filterRow,
          filterStyle.filterItemSpace,
          { flex: 1, justifyContent: "space-between" },
        ]}
      >
        <View style={[filterStyle.filterRow]}>
          <Image
            style={filterStyle.calenderIcon}
            source={require("../assets/icons/calender-icon.svg")}
          />
          <Text style={filterStyle.filterItemTxt}>{label}</Text>
        </View>

        {active && (
          <Image
            style={filterStyle.checkedIcon}
            source={require("../assets/icons/checked-icon.svg")}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FilterList;
