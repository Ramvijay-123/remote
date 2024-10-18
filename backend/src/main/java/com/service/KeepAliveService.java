import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
@Service
public class KeepAliveService {
    @Scheduled(fixedRate = 600000) 
    public void pingMyApp() {
        try {
           System.out.println("System is running");
        } catch (Exception e) {
          
        }
    }
}
