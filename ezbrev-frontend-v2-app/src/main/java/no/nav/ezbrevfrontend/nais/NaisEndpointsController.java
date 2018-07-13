package no.nav.ezbrevfrontend.nais;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
public class NaisEndpointsController {

    @GetMapping("/isAlive")
    String isAlive() {
        return "OK";
    }

    @GetMapping("/isReady")
    String isReady() {
        return "OK";
    }
}
