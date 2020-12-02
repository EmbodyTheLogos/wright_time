package edu.team5.wright_time.security;

import edu.team5.wright_time.model.entity.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null) {
            return Optional.of("system");
        } else if(auth.getPrincipal().equals("anonymousUser")) {
            return Optional.of("anonymousUser");
        }
        return Optional.of(((User) auth.getPrincipal()).getEmail());
    }
}
