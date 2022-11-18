package com.bsandor.stocksimulator.services;

import de.androidpit.colorthief.ColorThief;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;

@Service
@Slf4j
public class ImageProcessorService {

    // Returns the dominant color as a hex value from an image given with a URL
    public static String getDominantColorFromImageUrl(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        BufferedImage image = ImageIO.read(url);
        int[] colors = ColorThief.getColor(image);
        return String.format("#%02x%02x%02x", colors[0], colors[1], colors[2]);
    }

}


