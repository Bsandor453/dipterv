package com.example.springjwt.models.cryptocurrency.history;

public enum ETimeframe {
    HISTORY_24H("24h"), HISTORY_7D("7d"), HISTORY_30D("30d"), HISTORY_1Y("1y"), HISTORY_MAX("max");

    public final String daysAgo;

    ETimeframe(String daysAgo) {
        this.daysAgo = daysAgo;
    }

    public static ETimeframe getEnumValueFromDaysAgoString(String daysAgo) {
        for (ETimeframe e : ETimeframe.values()) {
            if (e.daysAgo.equals(daysAgo)) {
                return e;
            }
        }
        return HISTORY_7D;
    }

}
