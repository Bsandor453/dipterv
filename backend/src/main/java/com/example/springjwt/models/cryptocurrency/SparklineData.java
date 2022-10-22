package com.example.springjwt.models.cryptocurrency;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class SparklineData {

    @JsonProperty("price")
    private List<Double> price;

}
