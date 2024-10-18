import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

@Service
public class KeepAliveService {
    private final RestTemplate restTemplate = new RestTemplate();
    @Scheduled(fixedRate = 600000) 
    public void pingMyApp() {
        String url = "https://remote-theta.vercel.app/";
        try {
            restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
          
        }
    }
}
