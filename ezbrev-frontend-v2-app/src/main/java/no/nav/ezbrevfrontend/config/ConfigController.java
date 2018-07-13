package no.nav.ezbrevfrontend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
public class ConfigController {

    @Value("${ezbrev-host}")
    String ezbrevHost;

    @GetMapping
    String getConfig() {
        return ezbrevHost;
    }
}
